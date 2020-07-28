/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package logic;

import auth.RequiresAuthorization;
import com.fasterxml.jackson.databind.ObjectMapper;
import entity.Note;
import entity.RealObject;
import entity.Role;
import io.swagger.annotations.Api;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;

import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.commons.io.IOUtils;
import restTransferClasses.GeneralResponse;

@WebServlet(urlPatterns = {"/FileHandlerServlet"})
//@MultipartConfig(location = "/tmp")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 10,
        maxFileSize = 1024 * 1024 * 40,
        maxRequestSize = 1024 * 1024 * 80
)
@RequiresAuthorization({Role.ADMINISTRATOR, Role.GUEST, Role.MODERATOR, Role.USER})
@Transactional
/**
 * Handles Fileuploads and downloads
 */
public class FileHandlerServlet extends HttpServlet {

    @PersistenceContext(unitName = "MYSQLPU")
    protected EntityManager em;
    public static String BASEPATH = System.getProperty("user.home") + File.separator + "Footnote" + File.separator + "files";
    public static String TESSERACTPATH = System.getProperty("user.home") + File.separator + "Footnote" + File.separator + "tesseractData";
    @Inject
    org.apache.log4j.Logger log;

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        log.info("File Upload started to" + BASEPATH);
        InputStream is = request.getInputStream();//Security Problem! jeda kann auf eine note zugreifen
        String symbol;
        do {
            byte[] buffer = new byte[1];
            is.read(buffer);
             symbol= new String(buffer);

        } while (!symbol.equals(","));

        int lenght = is.available();
        System.out.println(lenght);
        Tesseract tesseract = new Tesseract();
        String filename = request.getParameter("filename");
        tesseract.setDatapath(TESSERACTPATH);
        //Save image on server     
        // //Glassfish: FileOutputStream fo = new FileOutputStream(root.getAbsolutePath() + File.separator + "upload_image" + File.separator + filename);
        //DIRECTORY MUST EXIST IS NOT CREEATED

        try (FileOutputStream fo = new FileOutputStream(new File(BASEPATH, filename))) {
            boolean fileInformationSupplied = false;
            try {
                long objectid = Long.valueOf(request.getParameter("realobjectid"));
                RealObject ro = em.find(RealObject.class, objectid);
                ro.setImage(filename);
                fileInformationSupplied = true;
            } catch (Exception ex) {
                log.info("objectid not set" + ex.getLocalizedMessage());
            }
            try {
                long objectid = Long.valueOf(request.getParameter("noteid"));
                Note ro = em.find(Note.class, objectid);
                ro.addFile(filename);
                fileInformationSupplied = true;
                //testdata directory must be createds
                String text;
                try {
                    text = tesseract.doOCR(new File(BASEPATH, filename));
                    log.debug(text);
                    ro.setOCR(text);
                } catch (Exception ex) {
                    if (Files.notExists(Paths.get(TESSERACTPATH))) {
                        log.warn("OCR Directory doesnt exist, upload TestData");
                    }
                    log.info(ex.getLocalizedMessage());
                    //response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "OCR Failed \n" + ex.getLocalizedMessage());
                }

            } catch (Exception ex) {
                log.info("noteid not set" + ex.getLocalizedMessage());
            }
            if (!fileInformationSupplied) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "NoteID or RealObject id not included, include at least one");
            }
            IOUtils.copy(Base64.getDecoder().wrap(is), fo);
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
            if (Files.notExists(Paths.get(BASEPATH))) {
                response.sendError(HttpServletResponse.SC_NOT_IMPLEMENTED, "Directory to upload files to doesnt exist on Server");
                log.warn("directory to upload images to doesnt exist");
            }
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Couldnt save File \n" + e.getLocalizedMessage());
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        GeneralResponse res = new GeneralResponse("sucess");
        try (PrintWriter out = response.getWriter()) {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonString = objectMapper.writeValueAsString(res);
            out.println(jsonString);
        } catch (Exception ex) {
            log.warn(ex.getLocalizedMessage());
        }
        log.info("Fileupload done");
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        log.info("Filedownload started");
        //.get(.......?filename="/ordner/file.jpg)
        String filename = request.getParameter("filename");
        File my_file = new File(BASEPATH, filename);
        if (!my_file.exists()) {
            if (Files.notExists(Paths.get(BASEPATH))) {
                response.sendError(HttpServletResponse.SC_NOT_IMPLEMENTED, "directory to download images from doesnt exist");
                log.warn("directory to download images from doesnt exist");
            }
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "File doesnt exist");
        }
        OutputStream out = response.getOutputStream();

        try (FileInputStream in = new FileInputStream(my_file)) {
            byte[] buffer = new byte[4096];
            int length;
            while ((length = in.read(buffer)) > 0) {
                out.write(buffer, 0, length);
            }
            in.close();
            out.flush();
        }

        log.info("Filedownload ended");
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        System.out.println("post");
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>    
}
